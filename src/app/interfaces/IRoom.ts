import { IMediaAttachment } from "./IMediaAttachment";

export interface IRoom {
  id: string,
  name: string;
  ownerId: string;
//  owner: IOwner;
 // roomSellers: any[];
  mediaAttachment: IMediaAttachment;
}
