import { Component, OnInit } from '@angular/core';
import {EvotorRequestsService} from '../evotor-requests.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [EvotorRequestsService]
})
export class AddProductComponent implements OnInit {

  constructor(private evotorService: EvotorRequestsService){}

      ngOnInit(){
          this.evotorService.getStores('exampleToken').subscribe((data: Response) => console.log(data.json()));
      }

}
