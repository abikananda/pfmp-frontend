export class AddInvestment {
    particular: string;
    invAmount: number;
    invReturn: number;

    constructor(particular: string, invAmount: number, invReturn: number) {
        this.particular = particular;
        this.invAmount = invAmount;
        this.invReturn = invReturn;
    }
}
