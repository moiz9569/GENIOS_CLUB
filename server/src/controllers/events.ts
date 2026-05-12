import { GENEVENT, LUCEVENT } from "../models/event";
import { Request, Response } from "express";
import { config } from "dotenv";
config();

export const getEvents = async (req: Request, res: Response) => {
  const userAddress = req.params.id;
  const { currentPage, itemsPerPage } = req.body;
  try {
    const totalEventsCount = await GENEVENT.countDocuments({
      data: {
        $regex: new RegExp(`"referrer":"${userAddress}"`),
      },
    });
    const totalPages = Math.ceil(totalEventsCount / itemsPerPage);

    const result = await GENEVENT.find({
      data: {
        $regex: new RegExp(`"referrer":"${userAddress}"`),
      },
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

export const getUsersLast24Hour = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  try {
    let allEvents;
    if (eventId === "gen") {
      // Find events added in the last 24 hours with the name "registration"
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      allEvents = await GENEVENT.find({
        createdAt: { $gte: twentyFourHoursAgo },
        eventName: "Registration",
      }).sort({ createdAt: 1 });
    } else {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    res.status(200).json({ data: allEvents });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "An error occurred", Error: error });
  }
};

export const getG3X2Matrixes = async (req: Request, res: Response) => {
  const { currentPage, itemsPerPage, userAddress, matrixLevel } = req.body;
  try {
    const totalEventsCount = await GENEVENT.countDocuments({
      $and: [
        {
          data: {
            $regex: new RegExp(`"referrer":"${userAddress}"`),
          },
        },
        {
          data: {
            $regex: new RegExp(`"level":${matrixLevel}`),
          },
        },
        {
          data: {
            $regex: new RegExp(`"matrix":${1}`),
          },
        },
      ],
      eventName: "NewUserPlace" || "Reinvest",
    });
    const totalPages = Math.ceil(totalEventsCount / itemsPerPage);

    const result = await GENEVENT.find({
      $and: [
        {
          data: {
            $regex: new RegExp(`"referrer":"${userAddress}"`),
          },
        },
        {
          data: {
            $regex: new RegExp(`"level":${matrixLevel}`),
          },
        },
        {
          data: {
            $regex: new RegExp(`"matrix":${1}`),
          },
        },
      ],
      eventName: "NewUserPlace" || "Reinvest",
    })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({
      data: result,
      pagination: {
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getG3X7Matrixes = async (req: Request, res: Response) => {
  const { currentPage, itemsPerPage, userAddress, matrixLevel } = req.body;
  try {
    const totalEventsCount = await GENEVENT.countDocuments({
      $and: [
        {
          data: {
            $regex: new RegExp(`"referrer":"${userAddress}"`),
          },
        },
        {
          data: {
            $regex: new RegExp(`"level":${matrixLevel}`),
          },
        },
        {
          data: {
            $regex: new RegExp(`"matrix":${1}`),
          },
        },
        {
          "userId.hex": {
            $ne: "0x00", // Assuming "hex" is a string. If it's a number, use $ne: 0
          },
        },
      ],
      eventName: "NewUserPlace" || "Reinvest",
    });

    const totalPages = Math.ceil(totalEventsCount / itemsPerPage);

    const result = await GENEVENT.find({
      $and: [
        {
          data: {
            $regex: new RegExp(`"referrer":"${userAddress}"`),
          },
        },
        {
          data: {
            $regex: new RegExp(`"level":${matrixLevel}`),
          },
        },
        {
          data: {
            $regex: new RegExp(`"matrix":${1}`),
          },
        },
        {
          "userId.hex": {
            $ne: "0x00", // Assuming "hex" is a string. If it's a number, use $ne: 0
          },
        },
      ],
      eventName: "NewUserPlace" || "Reinvest",
    })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({
      data: result,
      pagination: {
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
