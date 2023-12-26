import { fireEvent, render } from "@utils/testHelper";
import FormLogin from "@components/FormLogin";
import classes from "@components/FormLogin/style.module.scss"

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

let wrapper;

beforeEach(() => {
    wrapper = render(<FormLogin />)
})

describe("Form login", () => {
    test('Should render correctly', () => {
        const { getByTestId } = wrapper;
        const FormLoginComponent = getByTestId('formContainer');
        expect(FormLoginComponent).toHaveClass(classes.formContainer)
        expect(FormLoginComponent).toBeInTheDocument();
    })

    test('Should render form login correctly', () => {
        const { getByTestId } = wrapper;
        const FormLoginComponent = getByTestId('formLogin');
        expect(FormLoginComponent).toHaveClass(classes.formLogin)
        expect(FormLoginComponent).toBeInTheDocument();
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

    test('Should render button google login correctly', () => {
        const { getByTestId } = wrapper;
        const googleButton = getByTestId('google');
        expect(googleButton).toHaveClass(classes.googleButton)
        expect(googleButton).toBeInTheDocument();
    })

    test('Should call navigate when text clicked', () => {
        const { getByTestId } = wrapper;
        const text = getByTestId('toRegister');
        fireEvent.click(text);
        expect(mockNavigate).toHaveBeenCalledWith(`/register`);
    })

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})