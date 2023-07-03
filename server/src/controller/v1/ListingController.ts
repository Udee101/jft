import { Request, Response } from "express"
import { Listing } from "../../model/Listing"
import { AppDataSource } from "../../data-source"
import { ListingService } from "../../services/ListingService"
import { validate } from "class-validator"
import { paginateResponse } from "../../helper/helpers"

export class ListingController {

  public static index = async(req:Request, res:Response) => {

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 3
    const search = req.query.search

    const listings = await ListingService.getAllListings(page, limit, search)
    const totalCount = listings.length
    
    const paginateListings = paginateResponse(listings, page, limit, totalCount)

    return res.status(200).json(paginateListings)
  };

  public static create = async(req:Request, res:Response) => {
    
    const listing = await ListingService.creatListing(req.body)
    const errors = await validate(listing, { validationError: { target: false } })
    if (errors.length > 0) {
      return res.status(400).json({ error : errors })
    } else {
      
      const listingRepository = AppDataSource.getRepository(Listing)
      await listingRepository.insert(listing)
      
      return res.status(201).json({
        message: "Job Listing Created !",
        listing: listing
      })
    }
  };

  public static show = async(req:Request, res:Response) => {

    const listing = await AppDataSource.getRepository(Listing).findOneBy({ id: parseInt(req.params.id) })

    if (!listing) {
      return res.status(404).json({ message: "Listing Not Found" })
    }
    return res.status(200).json({
      listing: listing
    })
  };

  public static update = async(req:Request, res:Response) => {
    
    const listing = await ListingService.updateListing(parseInt(req.params.id), req.body)

    if (!listing) {
      return res.status(404).json({ message: "Listing Not Found"})
    }
    return res.status(200).json({
      message: "Updated Successfully!",
      listing: listing
    })
  };

  public static getUserListings = async(req:Request, res:Response) => {

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 3
    const search = req.query.search

    const listings = await ListingService.showUserListings(parseInt(req.params.id), page, limit, search)
    const totalCount = listings.length
    const paginateListings = paginateResponse(listings, page, limit, totalCount)

    return res.status(200).json(paginateListings)
  };

  public static destroy = async(req:Request, res:Response) => {

    const listingRepository = AppDataSource.getRepository(Listing)

    const listing = await listingRepository.findOneBy({ id: parseInt(req.params.id) })

    if (!listing) {
      return res.status(404).json({ message: "Listing Not Found"})
    }
    await listingRepository.remove(listing)

    return res.sendStatus(204)
  };
}
