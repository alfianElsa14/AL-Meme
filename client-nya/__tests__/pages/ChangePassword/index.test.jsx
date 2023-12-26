import ChangePassword from "@pages/ChangePassword";
import classes from "@pages/ChangePassword/style.module.scss";

import { fireEvent, render } from "@utils/testHelper";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

let wrapper;

beforeEach(() => {
    wrapper = render(<ChangePassword />)
})

describe("page change password", () => {
    test('Should render container correctly', () => {
        const { getByTestId } = wrapper;
        const ChangePasswordContainer = getByTestId('ChangePasswordContainer');
        expect(ChangePasswordContainer).toHaveClass(classes.container)
        expect(ChangePasswordContainer).toBeInTheDocument();
    })

    test('Should render title correctly', () => {
        const { getByTestId } = wrapper;
        const ChangePasswordTitle = getByTestId('ChangePasswordTitle');
        expect(ChangePasswordTitle).toHaveClass(classes.title)
        expect(ChangePasswordTitle).toBeInTheDocument();
    })

    test('Should render input item correctly', () => {
        const { getByTestId } = wrapper;
        const ChangePasswordInput = getByTestId('ChangePasswordInput');
        expect(ChangePasswordInput).toHaveClass(classes.inputItem)
        expect(ChangePasswordInput).toBeInTheDocument();
    })

    test('Should handle input old password change', () => {
        const { getByTestId } = wrapper;
        const oldPasswordInput = getByTestId('oldPassword');
        fireEvent.change(oldPasswordInput, { target: { value : '1234567'}})
        expect(oldPasswordInput.value).toBe('1234567')
    })

    test('Should handle input old password change', () => {
        const { getByTestId } = wrapper;
        const newPasswordInput = getByTestId('newPassword');
        fireEvent.change(newPasswordInput, { target: { value : '123456789'}})
        expect(newPasswordInput.value).toBe('123456789')
    })

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})