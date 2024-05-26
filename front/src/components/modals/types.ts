
export type DataModal = {
    id :  string;
    title: string;
    inputs: ImputsModal[]
    footer: string;
}

type MiddleModal = {
   
    
}

type FooterModal = {
   
    titleButton: string;
    handleButton : () => void

}

type ImputsModal = {
    id: string;
    name: string;
    placeholder: string;
    type : "date" | "number" |  "text" | "select";
    validate: boolean;
}