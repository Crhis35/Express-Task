const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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

const populationData = async (RModel, id, uuids) => {
  let data = {};
  for (let el in id) {
    try {
      let found = await RModel[el].findOne({
        where: { uuid: uuids[id[el]] },
      });
      data[id[el]] = found.id;
    } catch (e) {
      return new AppError(`Did not find ${el} in database`, 404);
    }
  }
  return data;
};
exports.createOne = (Model, RelationModel) =>
  catchAsync(async (req, res, next) => {
    if (RelationModel) {
      const { RModel, id } = RelationModel;
      populationData(RModel, id, req.uuids)
        .then(async (obj) => {
          const newDoc = await Model.create({
            ...obj,
            ...req.body,
          });
          res.status(201).json({
            status: 'success',
            data: newDoc,
          });
        })
        .catch((err) => {
          return next(new AppError(err.message, 404));
        });
    } else {
      const newDoc = await Model.create({
        ...req.body,
      });
      res.status(201).json({
        status: 'success',
        data: newDoc,
      });
    }
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const options = {};
    if (popOptions) options['include'] = [popOptions];
    let doc = await Model.findOne({
      where: {
        uuid: req.params.id,
      },
      ...options,
    });

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
