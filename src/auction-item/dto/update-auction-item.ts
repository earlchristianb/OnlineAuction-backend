import { PartialType } from "@nestjs/swagger";
import { CreateAuctionItem } from "./create-auction-item.dto";

export class UpdateAuctionItem extends PartialType(CreateAuctionItem) {}