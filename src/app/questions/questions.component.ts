import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit {
  @Input() questionGroup!: FormGroup;
  public teste: boolean = false
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {}

  get question(): any {
    return this.questionGroup.value;
  }

  get alternatives(): FormArray {
    return this.questionGroup.get('alternatives') as FormArray;
  }

  get subQuestion(): FormArray {
    return this.alternatives.get('subQuestion') as FormArray;
  }

  isAlternativeSelected(alternativeId: string): boolean {
    const selectedIds = this.questionGroup.get('value')?.value || [];
    return selectedIds.includes(alternativeId);
  }

  onCheckboxChange(event: any, alternative: FormGroup) {
    const ids = this.questionGroup.get('value')?.value as Array<number>;
    const alternativeId = alternative.get('id')?.value;
    const isSelected = event.checked;

    if (isSelected) {
      alternative.get('isSelected')?.setValue(isSelected);
      if (!ids.includes(alternativeId)) {
        ids.push(alternativeId);
        this.questionGroup.get('value')?.setValue(ids);
      }
    }

    if (!isSelected) {
      const index = ids.findIndex((value: number) => value === alternativeId);
      if (index !== -1) {
        ids.splice(index, 1);
        this.questionGroup.get('value')?.setValue(ids);
      }
      this.deselectAll(alternative);
    }
  }

  deselectAll(group: FormGroup) {
    group.get('isSelected')?.setValue(false);
    group.get('value')?.setValue([]);

    const alternatives = group.get('alternatives') as FormArray;
    if (alternatives) {
      alternatives.controls.forEach((alt: any) => {
        this.deselectAll(alt);
      });
    }

    const subQuestion = (group.get('subQuestion') as FormArray).at(0);

    if (subQuestion) {
      this.deselectAll(subQuestion as FormGroup);
    }
  }
}
