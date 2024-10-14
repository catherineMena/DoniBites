import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-incoming-stock',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './read-incoming-stock.component.html',
  styleUrl: './read-incoming-stock.component.css'
})
export class ReadIncomingStockComponent implements OnInit {
  stockEntry: any;

  constructor(private inventoryService: InventoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const stockId = +params['id'];
      this.getStockEntryById(stockId);
    });
  }

  getStockEntryById(id: number): void {
    this.inventoryService.getStockEntryById(id).subscribe(
      res => {
        this.stockEntry = res;
      },
      err => console.error(err)
    );
  }
}
