import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import {
  GiBarn,
  GiBoatFishing,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';

export const categories = [
  {
    id: 1,
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!'
  },
  {
    id: 2,
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills!'
  },
  {
    id: 3,
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!'
  },
  {
    id: 4,
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!'
  },
  {
    id: 5,
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool!'
  },
  {
    id: 6,
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!'
  },
  {
    id: 7,
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake!'
  },
  {
    id: 8,
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities!'
  },
  {
    id: 9,
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in a castle!'
  },
  {
    id: 10,
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping acitvities!'
  },
  {
    id: 11,
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property has snow acitvities!'
  },
  {
    id: 12,
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is in a cave!'
  },
  {
    id: 13,
    label: 'Desert',
    icon: GiCaveEntrance,
    description: 'This property is in the desert!'
  },
  {
    id: 14,
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in the barn!'
  },
  {
    id: 15,
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious!'
  }
];
