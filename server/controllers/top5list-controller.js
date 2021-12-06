const Top5List = require("../models/top5list-model");
const User = require("../models/user-model");
const AggList = require("../models/aggList-model");

createTop5List = (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Top 5 List",
    });
  }

  const top5List = new Top5List(body);
  console.log("creating top5List: " + JSON.stringify(top5List));
  if (!top5List) {
    return res.status(400).json({ success: false, error: err });
  }
  top5List
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        top5List: top5List,
        message: "Top 5 List Created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Top 5 List Not Created!",
      });
    });
};
decimateAggList = (id) => {
  const agglist = Top5List.findOne({ _id: id }, function (err, agglist) {
    console.log("realList", agglist);
    const aggup = AggList.findOne(
      { name: agglist.name },
      function (err, aggup) {
        console.log("before", aggup.lists);
        const index = aggup.lists.indexOf(id);
        if (index > -1) {
          aggup.lists.splice(index, 1);
        }
        console.log("after", aggup.lists);
        if (aggup.lists.length == 0) {
          AggList.findByIdAndRemove(aggup.id).exec();
          return;
        }
        AggList.findOneAndUpdate(
          { name: aggup.name },
          { lists: aggup.lists },
          { useFindAndModify: false }
        ).exec();
      }
    );
  });
};

updateTop5List = async (req, res) => {
  console.log("update started");
  const body = req.body;
  console.log("updateTop5List: " + JSON.stringify(body));
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  if (body.public) {
    await createAggList(body);
  }

  Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
    console.log("top5List found: " + JSON.stringify(top5List));
    if (err) {
      return res.status(404).json({
        err,
        message: "Top 5 List not found!",
      });
    }

    top5List.name = body.name;
    top5List.items = body.items;
    if (body.comments) {
      top5List.comments = body.comments;
    }
    if (body.likes) {
      top5List.likes = body.likes;
    }
    if (body.dislikes) {
      top5List.dislikes = body.dislikes;
    }
    if (body.views) {
      top5List.views = body.views;
    }
    if (body.public) {
      top5List.public = body.public;
    }
    top5List
      .save()
      .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
          success: true,
          id: top5List._id,
          message: "Top 5 List updated!",
        });
      })
      .catch((error) => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
          error,
          message: "Top 5 List not updated!",
        });
      });
  });
};

deleteTop5List = async (req, res) => {
  decimateAggList(req.params.id);
  const user = await User.findById(req.userId).exec();
  console.log(req.params.id);
  Top5List.findById(
    { _id: req.params.id, ownerEmail: user.email },
    (err, top5List) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "Top 5 List not found!",
        });
      }
      Top5List.findOneAndDelete(
        { _id: req.params.id, ownerEmail: user.email },
        () => {
          console.log("seemstobreakhere!");
          return res.status(200).json({ success: true, data: top5List });
        }
      ).catch((err) => console.log(err));
    }
  );
};

createAggList = async (body) => {
  console.log(body);
  const agglist = await AggList.findOne({ name: body.name }).exec();
  console.log("agglist", agglist);
  if (agglist == null) {
    AggList.create(
      {
        name: body.name,
        lists: [body._id],
        likes: [],
        dislikes: [],
        views: 0,
        comments: [],
      },
      function (err, agglist) {
        if (err) {
          console.log(err);
        }
      }
    );
  } else {
    agglist.lists.push(body._id);
    console.log("newLists", agglist.lists);
    AggList.findOneAndUpdate(
      { name: body.name },
      { lists: agglist.lists },
      { useFindAndModify: false }
    ).exec();
  }
};

getTop5ListById = async (req, res) => {
  await Top5List.findById({ _id: req.params.id }, (err, list) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log("110", list.ownerEmail);
    if (false) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, top5List: list });
  }).catch((err) => console.log(err));
};
getTop5Lists = async (req, res) => {
  await Top5List.find({}, (err, top5Lists) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!top5Lists.length) {
      return res
        .status(404)
        .json({ success: false, error: `Top 5 Lists not found` });
    }
    return res.status(200).json({ success: true, data: top5Lists });
  }).catch((err) => console.log(err));
};

getAggLists = async (req, res) => {
  await AggList.find({}, (err, agglists) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!agglists.length) {
      return res
        .status(404)
        .json({ success: false, error: `Top 5 Lists not found` });
    }
    return res.status(200).json({ success: true, data: agglists });
  }).catch((err) => console.log(err));
};

updateAggListbyId = async (req, res) => {
  const body = req.body;
  await AggList.findOneAndUpdate(
    { id: req.params.id },
    {
      likes: body.likes,
      dislikes: body.dislikes,
      views: body.views,
      comments: body.comments,
    },
    { useFindAndModify: false }
  ).exec();
};

getTop5ListPairs = async (req, res) => {
  const user = await User.findById(req.userId).exec();
  await Top5List.find({}, (err, top5Lists) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!top5Lists) {
      console.log("!top5Lists.length");
      return res
        .status(404)
        .json({ success: false, error: "Top 5 Lists not found" });
    } else {
      // PUT ALL THE LISTS INTO ID, NAME PAIRS
      let pairs = [];
      for (let key in top5Lists) {
        let list = top5Lists[key];
        let pair = {
          _id: list._id,
          name: list.name,
          ownerEmail: list.ownerEmail,
          username: list.username,
          likes: list.likes,
          dislikes: list.dislikes,
          views: list.views,
          public: list.public,
          items: list.items,
          comments: list.comments,
          updatedAt: list.updatedAt,
        };
        pairs.push(pair);
      }
      return res.status(200).json({ success: true, idNamePairs: pairs });
    }
  }).catch((err) => console.log(err));
};

module.exports = {
  createTop5List,
  updateTop5List,
  deleteTop5List,
  getTop5Lists,
  getTop5ListPairs,
  getTop5ListById,
};
