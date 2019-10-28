import {BehaviorSubject} from 'rxjs';
import {IPerson} from './IPerson';

export interface IPersonSharedData {
    personListRefresh: BehaviorSubject<number>;
    personEditMode: BehaviorSubject<IPerson>;
}