import { Request, Response } from "express"
import { User } from "../../entity/User"
import { Listing } from "../../entity/Listing"
import { AppDataSource } from "../../data-source"

export class ListingController {

  public static index = async(req:Request, res:Response) => {

    const listings = await AppDataSource.getRepository(Listing).find()
    return res.status(200).json({ listings: listings })

  };

  public static create = async(req:Request, res:Response) => {
    
    const Validator = require("fastest-validator");
    
    const {
      userId,
      title,
      tags,
      company,
      email,
      location,
      website,
      description
    } = req.body

    const v = new Validator()
    const schema = {
      title: "string|required",
      tags: "string|required",
      company: "string|required",
      email: "email|required",
      location: "string|required",
      website: "url|required",
      description: "string|required",
    }
    const check = v.compile(schema)

    const result = check({
      title: title,
      tags: tags,
      company: company,
      email: email,
      location: location,
      website: website,
      description: description
    })

    if (result !== true) {
      return res.status(400).json({error: result})
    }

    const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(userId) })

    const listingRepository = AppDataSource.getRepository(Listing)

    const listing = listingRepository.create({
      title: title,
      tags: tags,
      company: company,
      email: email,
      location: location,
      website: website,
      description: description,
    })

    listing.user = user
    await listingRepository.insert(listing)

    return res.status(201).json({
      message: "Job Listing created!",
      listing: listing
    })
    
  };

  public static show = async(req:Request, res:Response) => {

    const listing = await AppDataSource.getRepository(Listing).findOneBy({ id: parseInt(req.params.id)})

    if (!listing) {
      return res.status(404).json({ message: 'Listing Not Found'})
    }

    return res.status(200).json({
      listing: listing
    })
  };

  public static update = async(req:Request, res:Response) => {
    
    const listingRepository = AppDataSource.getRepository(Listing)

    const listing = await listingRepository.findOneBy({ id: parseInt(req.params.id) })

    if (!listing) {
      return res.status(404).json({ message: 'Listing Not Found'})
    }

    await listingRepository
      .createQueryBuilder()
      .update(Listing)
      .set({
        title: req.body.title ?? listing.title,
        tags: req.body.tags ?? listing.tags,
        company: req.body.company ?? listing.company,
        email: req.body.email ?? listing.email,
        location: req.body.location ?? listing.location,
        website: req.body.website ?? listing.website,
        description: req.body.description ?? listing.description,
      })
      .where("id = :id", { id: parseInt(req.params.id)})
    .execute()
    
    return res.status(200).json({
      message: 'Updated Successfully!',
      listing: listing
    })
  };

  public static getUserListings = async(req:Request, res:Response) => {
    
    const listings = await AppDataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .leftJoin('listing.user', 'user')
      .where("user.id = :id", { id: parseInt(req.params.id) })
      .getMany()

    return res.status(200).json({
      listings: listings
    })
  };

  public static destroy = async(req:Request, res:Response) => {

    const listingRepository = AppDataSource.getRepository(Listing)

    const listing = await listingRepository.findOneBy({ id: parseInt(req.params.id) })

    if (!listing) {
      return res.status(404).json({ message: 'Listing Not Found'})
    }
    await listingRepository.remove(listing)

    return res.sendStatus(204)
  }
}
