import { AbstractControl } from "@angular/forms"
import { Observable, of } from "rxjs"

export const mimeType = (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
  if (typeof control.value === 'string') {
    return of(null)
  }
  if (control.value.includes('image/')) {
    return new Observable<{ [key: string]: boolean } | null>(observer => {
      observer.next(null)
      observer.complete()
    })
  } else {
    return new Observable<{ [key: string]: boolean } | null>(observer => {
      observer.next({ invalidMimeType: true })
      observer.complete()
    })
  }
}
