import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { PaginationModel } from '../_models/pagination.model';
import { CardModel } from '../_models/card.model';

@Injectable()
export class CardService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }


    GetCardDatalist(paginationModel: PaginationModel) {
      return this.httpClient.post<ApiResponseModel>('Card/CardDataTableList', paginationModel)
        .pipe(map(
          data => data
        ));
    }


  InsertCard(data: any) {
       return this.httpClient.post<ApiResponseModel>('Card/InsertCard', data).pipe(map(Response => {
        return Response;
      }
      )
    );
  }

  UpdateCard(cardModel: CardModel) {
    return this.httpClient.post<ApiResponseModel>('Card/updateCardDetail', cardModel)
      .pipe(map(
        data => data
      ));
  }

   SoftDeleteCard(cardModel: CardModel) {
    return this.httpClient.post<ApiResponseModel>('Card/softdeletecard', cardModel)
      .pipe(map(
        data => data
      ));
  }

}
