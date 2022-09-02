import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Expose()
  approved: boolean;

  // the Tranform decorator here automatically gets the
  // parameter 'obj' which is a reference to the original report entity
  // it then assigns the obj.user.id to userId
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
