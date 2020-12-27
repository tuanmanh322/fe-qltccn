import {BaseSearch} from './base-search';

export interface ThuNhapSearch extends BaseSearch{
  mota?: string;
  thang?: string;
  year?: string;
}
