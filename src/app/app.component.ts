import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { MockService } from './mock.service';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, MatCheckboxModule, QuestionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  public form!: FormGroup;

  constructor(private readonly mockService: MockService, private readonly fb: FormBuilder) {}

  ngAfterViewInit(): void {}

  ngOnInit() {
    const mock = this.mockService.getMock();

    this.form = this.fb.group({
      id: new FormControl(mock.id),
      name: new FormControl(mock.name),
      customFieldType: new FormControl(mock.customFieldType),
      description: new FormControl(mock.description),
      value: new FormControl(mock.value),
      alternatives: this.fb.array([]),
      subQuestion: this.fb.array([]),
    });
    this.setAlternatives(mock.alternatives, this.form.get('alternatives') as FormArray);
  }

  setAlternatives(alternatives: any[], formArray: FormArray) {
    if (alternatives && alternatives.length) {
      alternatives.forEach((alternative) => {
        const alternativeGroup = this.fb.group({
          id: new FormControl(alternative.id),
          name: new FormControl(alternative.name),
          isSelected: new FormControl(alternative.isSelected),
          customFieldType: new FormControl(alternative.customFieldType),
          alternatives: this.fb.array([]),
          subQuestion: this.fb.array([]),
        });

        formArray.push(alternativeGroup);
        if (alternative.subQuestion && alternative.subQuestion.length > 0) {
          this.setSubQuestions(
            alternative.subQuestion,
            alternativeGroup.get('subQuestion') as FormArray
          );
        }

        if (alternative.alternatives && alternative.alternatives.length > 0) {
          this.setAlternatives(
            alternative.alternatives,
            alternativeGroup.get('alternatives') as FormArray
          );
        }
      });
    }
  }

  setSubQuestions(subQuestions: any[], formArray: FormArray) {
    if (subQuestions && subQuestions.length) {
      subQuestions.forEach((subQuestion) => {
        const subQuestionGroup = this.fb.group({
          id: new FormControl(subQuestion.id),
          name: [subQuestion.name],
          customFieldType: [subQuestion.customFieldType],
          description: [subQuestion.description],
          value: new FormControl(subQuestion.value),
          alternatives: this.fb.array([]),
          subQuestion: this.fb.array([]),
        });

        formArray.push(subQuestionGroup);

        if (subQuestion.subQuestion && subQuestion.subQuestion.length > 0) {
          this.setSubQuestions(
            subQuestion.subQuestion,
            subQuestionGroup.get('subQuestion') as FormArray
          );
        }

        if (subQuestion.alternatives && subQuestion.alternatives.length > 0) {
          this.setAlternatives(
            subQuestion.alternatives,
            subQuestionGroup.get('alternatives') as FormArray
          );
        }
      });
    }
  }

  getAlternatives(formArray: FormArray) {
    return formArray.controls;
  }
}
