import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, throwError } from "rxjs";
import { ErrorComponent } from "./error/error.component";

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const dialogRef = inject(MatDialog);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const data = computeData(error.status);
            dialogRef.open(ErrorComponent, {
                data
            });
        // Return the error to the caller
        return throwError(() => error);
        })
    );
};

const computeData = (errorStatus: number) => {
    switch (errorStatus) {
        case 401:
            return {
                title: "Authentication failed:",
                message: "Please log in again."
            };
        case 404:
            return {
                title: "Not found:",
                message: "The resource you are looking for does not exist."
            };
        default:
            return {
                title: "An error occurred:",
                message: "An unknown error occurred!"
            };
    }
}