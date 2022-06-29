interface AlertInput {
    type?:  | 'checkbox' | 'radio' | 'textarea';
    name?: string;
    placeholder?: string;
    value?: any;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    handler?: (input: AlertInput) => void;
    min?: string | number;
    max?: string | number;
    cssClass?: string | string[];
    attributes?: { [key: string]: any };
    tabindex?: number;
  }