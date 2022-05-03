// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
//
// @Index('workers_pkey', ['id'], { unique: true })
// @Entity('workers', { schema: 'public' })
// export class Workers {
//   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
//   public id: number;
//
//   @Column('boolean', { name: 'active', nullable: true })
//   public active: boolean | null;
//
//   @Column('character varying', {
//     name: 'ad_username',
//     nullable: true,
//     length: 80,
//   })
//   public adUsername: string | null;
//
//   @Column('character varying', { name: 'address', nullable: true, length: 255 })
//   public address: string | null;
//
//   @Column('character varying', { name: 'code', nullable: true, length: 20 })
//   public code: string | null;
//
//   @Column('boolean', { name: 'eligible', nullable: true })
//   public eligible: boolean | null;
//
//   @Column('character varying', { name: 'email', nullable: true, length: 255 })
//   public email: string | null;
//
//   @Column('character varying', {
//     name: 'first_name',
//     nullable: true,
//     length: 255,
//   })
//   public firstName: string | null;
//
//   @Column('character varying', { name: 'idn', nullable: true, length: 20 })
//   public idn: string | null;
//
//   @Column('character varying', {
//     name: 'last_name',
//     nullable: true,
//     length: 255,
//   })
//   public lastName: string | null;
//
//   @Column('character varying', { name: 'pass', nullable: true, length: 255 })
//   public pass: string | null;
//
//   @Column('character varying', { name: 'phone1', nullable: true, length: 20 })
//   public phone1: string | null;
//
//   @Column('character varying', { name: 'phone2', nullable: true, length: 20 })
//   public phone2: string | null;
//
//   @Column('character varying', { name: 'phone3', nullable: true, length: 20 })
//   public phone3: string | null;
//
//   @Column('character varying', { name: 'remarks', nullable: true })
//   public remarks: string | null;
//
//   @Column('boolean', { name: 'sms', nullable: true })
//   public sms: boolean | null;
//
//   @Column('boolean', { name: 'special_rides', nullable: true })
//   public specialRides: boolean | null;
//
//   @Column('integer', { name: 'unit_id', nullable: true })
//   public unitId: number | null;
//
//   @OneToMany(() => RequestedRides, (requestedRides) => requestedRides.worker)
//   public requestedRides: RequestedRides[];
//
//   @ManyToOne(() => Stations, (stations) => stations.workers)
//   @JoinColumn([{ name: 'departure_station', referencedColumnName: 'id' }])
//   public departureStation: Stations;
//
//   @ManyToOne(() => Stations, (stations) => stations.workers2)
//   @JoinColumn([{ name: 'destination_station', referencedColumnName: 'id' }])
//   public destinationStation: Stations;
//
//   @ManyToOne(() => Stations, (stations) => stations.workers3)
//   @JoinColumn([{ name: 'home_station', referencedColumnName: 'id' }])
//   public homeStation: Stations;
//
//   @ManyToOne(() => WorkerTypes, (workerTypes) => workerTypes.workers)
//   @JoinColumn([{ name: 'worker_type_id', referencedColumnName: 'id' }])
//   public workerType: WorkerTypes;
// }
