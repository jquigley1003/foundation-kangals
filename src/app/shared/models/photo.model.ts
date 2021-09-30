export interface Photo {
  id?: string;
  albumId: string;
  title: string;
  imageName?: string;
	imageUrl?: string;
  dateCreated?: Date;
  creatorId?: string;
}
