import { fireEvent, render } from "@utils/testHelper";
import classes from "@components/FormRegister/style.module.scss"
import FormRegister from "@components/FormRegister";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

let wrapper;

beforeEach(() => {
    wrapper = render(<FormRegister />)
})

describe("Form Register", () => {
    test('Should render correctly', () => {
        const { getByTestId } = wrapper;
        const FormRegisterComponent = getByTestId('formContainer');
        expect(FormRegisterComponent).toHaveClass(classes.formContainer)
        expect(FormRegisterComponent).toBeInTheDocument();
    })

    test('Should render form register correctly', () => {
        const { getByTestId } = wrapper;
        const FormRegister = getByTestId('formRegister');
        expect(FormRegister).toHaveClass(classes.formRegister)
        expect(FormRegister).toBeInTheDocument();
    })

    test('Should handle input username change', () => {
        const { getByTestId } = wrapper;
        const emailInput = getByTestId('username');
        fireEvent.change(emailInput, { target: { value : 'luak'}})
        expect(emailInput.value).toBe('luak')
    })

    test('Should handle input email change', () => {
        const { getByTestId } = wrapper;
        const emailInput = getByTestId('email');
        fireEvent.change(emailInput, { target: { value : 'luak@gmail.com'}})
        expect(emailInput.value).toBe('luak@gmail.com')
    })

    test('Should handle input password change', () => {
        const { getByTestId } = wrapper;
        const passwordInput = getByTestId('password');
        fireEvent.change(passwordInput, { target: { value : '1234567'}})
        expect(passwordInput.value).toBe('1234567')
    })

    test('Should call navigate when text clicked', () => {
        const { getByTestId } = wrapper;
        const text = getByTestId('toLogin');
        fireEvent.click(text);
        expect(mockNavigate).toHaveBeenCalledWith(`/login`);
    })

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})