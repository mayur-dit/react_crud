import {BehaviorSubject} from 'rxjs';

export interface IPersonSharedData {
    personListRefresh: BehaviorSubject<number>;
}