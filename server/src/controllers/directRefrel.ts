import { GENEVENT, LUCEVENT } from "../models/event";
import { Request, Response } from "express";
import { config } from "dotenv";
config();

export const getDirectEvents = async (req: Request, res: Response) => {
  const userAddress = req.params.id;

  const { currentPage, itemsPerPage } = req.body;
  try {
    const totalEventsCount = await GENEVENT.countDocuments({
      data: {
        $regex: new RegExp(`"referrer":"${userAddress}"`),
      },
      eventName: "Registration",
    });
    const totalPages = Math.ceil(totalEventsCount / itemsPerPage);
    const result = await GENEVENT.find({
      data: {
        $regex: new RegExp(`"referrer":"${userAddress}"`),
      },
      eventName: "Registration",
    })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({
      data: result,
      pagination: {
        currentPage,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
