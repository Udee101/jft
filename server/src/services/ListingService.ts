import { Listing } from "../entity/Listing"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { Brackets } from "typeorm"

export class ListingService {

  public static async getAllListings(page: number, limit: number, search: any) {

    const skip = (page - 1) * limit

    if (search) {
      const searchResult = await AppDataSource
        .getRepository(Listing)
        .createQueryBuilder("listings")
        .where("listings.title LIKE :search OR listings.company LIKE :search OR listings.tags LIKE :search", { search: '%' + search + '%' })
        .skip(skip)
        .take(limit)
        .getMany()

      return searchResult

    } else {

      const Alllistings = await AppDataSource
        .getRepository(Listing)
        .createQueryBuilder("listings")
        .skip(skip)
        .take(limit)
        .getMany()
      
      return Alllistings
    }
    

  };

  public static async creatListing(data: any) {
    
    const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(data.userId) })
    
    const listing = new Listing()
    listing.title = data.title
    listing.tags = data.tags
    listing.company = data.company
    listing.email = data.email
    listing.location = data.location
    listing.website = data.website
    listing.description = data.description
    listing.user = user

    return listing
  };

  public static async updateListing(listingId: number, data: any) {
    
    const listingRepository = AppDataSource.getRepository(Listing)

    const listing = await listingRepository.findOneBy({ id: listingId })

    if (!listing) {
      return null
    } else {
      
      await listingRepository
      .createQueryBuilder()
      .update(Listing)
      .set({
        title: data.title ?? listing.title,
        tags: data.tags ?? listing.tags,
        company: data.company ?? listing.company,
        email: data.email ?? listing.email,
        location: data.location ?? listing.location,
        website: data.website ?? listing.website,
        description: data.description ?? listing.description,
      })
      .where("id = :id", { id: listingId })
      .execute()
      
      return await listingRepository.findOneBy({ id: listingId })
    }
  };

  public static async showUserListings(userId: number, page: number, limit: number, search: any) {

    const skip = (page - 1) * limit

    if (search) {
      const searchResult = await AppDataSource
        .getRepository(Listing)
        .createQueryBuilder("listings")
        .leftJoin("listings.user", "user")
        .where("user.id = :id", { id: userId })
        .andWhere("listings.title LIKE :search OR listings.company LIKE :search", { search: '%' + search + '%' })
        .skip(skip)
        .take(limit)
        .getMany()

      return searchResult

    } else {

      const listings = await AppDataSource
        .getRepository(Listing)
        .createQueryBuilder("listings")
        .leftJoin("listings.user", "user")
        .where("user.id = :id", { id: userId })
        .skip(skip)
        .take(limit)
        .getMany()

      return listings
    }
  };
}
