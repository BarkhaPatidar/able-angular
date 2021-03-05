import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AddPostModal } from '../add-post/add-post.component';

@Component({
  selector: 'timeline-component',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  get postData() {
    return JSON.parse(this._timelineService.getPostData()!)
  }

  constructor(public _timelineService: UserService, private modalService: NgbModal) {}

  ngOnInit() {
    
  }

  closeResult = '';

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  openAddPostModal() {
    const modalRef = this.modalService.open(AddPostModal);
    // modalRef.componentInstance.name = 'Barkha';
  }

  
}