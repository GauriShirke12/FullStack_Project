import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getUserRatings, upsertRating } from "./ratings.service";

export const submitRatingHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const rating = await upsertRating({
    userId,
    storeId: req.body.storeId,
    score: req.body.score
  });
  res.status(200).json({ success: true, data: rating });
});

export const getMyRatingsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const ratings = await getUserRatings(userId);
  res.status(200).json({ success: true, data: ratings });
});
