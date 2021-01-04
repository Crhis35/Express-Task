const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
// const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByPk(req.params.id);
    if (!doc) {
      return next(new AppError('No Document found with that ID', 404));
    }
    await doc.destroy();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!doc) {
      return next(new AppError('No Docuement found with that ID', 404));
    }
    doc = await doc.update(req.body, {
      returning: true,
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (
      await Model.findOne({
        where: {
          email: req.body.email,
        },
      })
    ) {
      return next(new AppError('Email Already exist', 400));
    }
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const options = {};
    if (popOptions) options['include'] = [popOptions];
    console.log(options);
    let doc = await Model.findOne({
      where: {
        uuid: req.params.id,
      },
      ...options,
    });
    // if (popOptions) query = query.populate(popOptions);

    // const doc = await query;

    if (!doc) {
      return next(new AppError('No Document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const params = ['offset', 'limit'];
    let { query } = req;
    const options = {};

    if (query) {
      Object.keys(query).map((key) => {
        if (params.includes(key)) options[key] = query[key];
      });
    }

    const doc = await Model.findAll({
      offset: 0,
      limit: 10,
      attributes: { exclude: ['password'] },
      ...options,
    });

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });
