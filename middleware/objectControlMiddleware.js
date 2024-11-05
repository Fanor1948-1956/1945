const deactivateObjectMiddleware = (Model) => async (req, res, next) => {
  const { id } = req.params;

  try {
    const object = await Model.findByIdAndUpdate(id, { isActive: false });

    if (!object) {
      return res
        .status(404)
        .json({ success: false, message: 'Object not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Object deactivated successfully' });
  } catch (error) {
    next(error);
  }
};

const activateObjectMiddleware = (Model) => async (req, res, next) => {
  const { id } = req.params;

  try {
    const object = await Model.findByIdAndUpdate(id, { isActive: true });

    if (!object) {
      return res
        .status(404)
        .json({ success: false, message: 'Object not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Object activated successfully' });
  } catch (error) {
    next(error);
  }
};
const deleteObjectMiddleware = (Model) => async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedObject = await Model.findByIdAndDelete(id);

    if (!deletedObject) {
      return res
        .status(404)
        .json({ success: false, message: 'Object not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Object deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deactivateObjectMiddleware,
  activateObjectMiddleware,
  deleteObjectMiddleware,
};
