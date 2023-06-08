import { Listing } from "../entity/Listing"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"


export class ListingService {

  public static async getAllListings(page: number, limit: number) {

    const skip = (page - 1) * limit
    const listings = await AppDataSource
      .getRepository(Listing)
      .createQueryBuilder("listings")
      .skip(skip)
      .take(limit)
      .getMany()

    return listings
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

  public static async showUserListings(userId: number, page: number, limit: number) {

    const skip = (page - 1) * limit

    const listings = await AppDataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .leftJoin("listing.user", "user")
      .where("user.id = :id", { id: userId })
      .skip(skip)
      .take(limit)
      .getMany()

    return listings
  };

  public static async getUserListingCount(userId: number) {
    const count = AppDataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .leftJoin("listing.user", "user")
      .where("user.id = :id", { id: userId })
      .getCount()

    return count
  };

  public static async getAllListingsCount() {
    const count = AppDataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .getCount()

    return count
  };
}
