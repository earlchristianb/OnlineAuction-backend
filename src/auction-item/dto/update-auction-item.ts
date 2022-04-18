import { PartialType } from "@nestjs/swagger";
import { createAuctionItem } from "./create-auction-item.dto";

export class updateAuctionItem extends PartialType(createAuctionItem) {}