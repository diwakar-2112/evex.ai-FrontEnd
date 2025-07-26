import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../../commonService/commonService';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import stationJsonData from '../../../assets/json/stationCode.json';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  secBgColor: any;
  constructor(private commonService: CommonService, private modalService: NgbModal) { }
  @ViewChild('apiErrorStatusModal')
  apiErrorStatusModal!: TemplateRef<any>;
  @ViewChild('errorModl')
  errorModl!: TemplateRef<any>;

  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.getData();
    this.lineData=stationJsonData.stations;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    // console.log(item);
  }
  closeModal() {
    // this.modalService.dismissAll(this.apiErrorStatusModal);

  }
  onSelectAll(items: any) {
    // console.log(items);
  }

  // 
  lineData: any;
  isSwapped = false;
  loader: boolean = false;
  searchForm = new FormGroup({
    startingPoint: new FormControl(''),
    endingPoint: new FormControl('')
  })
  getData() {
    this.commonService.getData().subscribe({
      next: (response) => {
        // console.log(response)
        // this.lineData = response;
        // this.lineData = response.map((item: { line_code: any; }) => item.line_code);
        // console.log(this.lineData)
      },
      error: (err) => {
        console.log("error")
      }
    })
  }
  bgColor: any;
  lineValue: any;
  lineColor: any;
  eachLineData: any
  startVal: boolean = false;
  endVal: boolean = false;
  getLines(value: any, point: any) {
    if(point=='startingPoint'){
      this.startVal==true;
      this.endVal==false;
    }else if(point=='endingPoint'){
      this.endVal==true;
      this.startVal==false;
    }
    // let line = value.target.value;

    // const selectedLine = this.lineData.find((item: { line_code: any; }) => item.line_code === line);
    // this.lineValue = selectedLine.name;
    // this.lineColor = selectedLine.line_color;
   


    // this.modalService.open(this.apiErrorStatusModal);
    // console.log("lsdflkdfjl this is like",line)
    // document.getElementById('loader')!.style.display = 'block';
    // this.commonService.getLines(line).subscribe({
    //   next: (response) => {
    //     this.eachLineData = response;
    //     console.log(this.eachLineData)
    //     document.getElementById('loader')!.style.display='block';
    //     document.getElementById('loader')!.style.display = 'none';
    //     console.log("line data",response)
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })
  }
  swapLocations() {
    this.isSwapped = !this.isSwapped;
    let val = this.searchForm.controls.startingPoint.value;
    // this.searchForm.controls.startingPoint=this.searchForm.controls.endingPoint;
    // this.searchForm.controls.endingPoint=val;
    this.searchForm.controls.startingPoint.setValue(this.searchForm.controls.endingPoint.value);
    this.searchForm.controls.endingPoint.setValue(val);
    // console.log(this.searchForm.controls.startingPoint.value,this.searchForm.controls.endingPoint.value)
  }
  isDarkMode = false;
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
  private applyTheme() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
  setStationCode(station1: any) {
    console.log(station1,"logstation1")
    if(this.startVal==true){
      console.log("yes insisde statrvasl");
      
      this.searchForm.controls.startingPoint.setValue(station1)
    }else{
      this.searchForm.controls.endingPoint.setValue(station1)
    }
  }
  findRoute(){
    // this.modalService.open(this.apiErrorStatusModal);
    let from = this.searchForm.controls.startingPoint.value;
    let to = this.searchForm.controls.endingPoint.value;
    let fromValue = this.lineData.filter((element:any)=>element.station_code==from)
    let toValue = this.lineData.filter((element:any)=>element.station_code==to);
    document.getElementById('loader')!.style.display = 'block';
    this.commonService.getRoute(fromValue[0].station_code,toValue.station_code).subscribe({
      next:(response)=>{
            document.getElementById('loader')!.style.display = 'none';
                // this.modalService.open(this.errorModl);
                
                console.log("yes done")
              },
              error:(error)=>{
        document.getElementById('loader')!.style.display = 'none';
        
      }
    })
    
  }

}
