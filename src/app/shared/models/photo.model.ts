export interface Photo {
  id?: string;
  albumId: string;
  title: string;
	imageUrl?: string;
  dateCreated?: Date;
  creatorId?: string;
}
