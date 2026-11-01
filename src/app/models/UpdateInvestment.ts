export class UpdateInvestment {
    particular: string;
    investmentStatus:string;
    invAmount:string;
    invReturn: number;
    comments:string;
    otherIncome:number;
    maturityDate:string;

    constructor(particular: string, investmentStatus: string, invAmount: string, invReturn: number,comments: string, otherIncome: number, maturityDate: string) {
        this.particular = particular;
        this.investmentStatus = investmentStatus;
        this.invAmount = invAmount;
        this.invReturn = invReturn;
        this.comments = comments;
        this.otherIncome = otherIncome;
        this.maturityDate = maturityDate;
    }
}
