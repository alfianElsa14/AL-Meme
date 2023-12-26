import BePremium from "@pages/BePremium";
import classes from "@pages/BePremium/style.module.scss"
import { render } from "@utils/testHelper";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

let wrapper;

beforeEach(() => {
    wrapper = render(<BePremium />)
})

describe("page be premium", () => {
    test('Should render container correctly', () => {
        const { getByTestId } = wrapper;
        const bePremiumContainer = getByTestId('bePremiumContainer');
        expect(bePremiumContainer).toHaveClass(classes.container)
        expect(bePremiumContainer).toBeInTheDocument();
    })

    test('Should render content correctly', () => {
        const { getByTestId } = wrapper;
        const bePremiumContent = getByTestId('bePremiumContent');
        expect(bePremiumContent).toHaveClass(classes.content)
        expect(bePremiumContent).toBeInTheDocument();
    })

    test('Should render title correctly', () => {
        const { getByTestId } = wrapper;
        const bePremiumTitle = getByTestId('bePremiumTitle');
        expect(bePremiumTitle).toHaveClass(classes.title)
        expect(bePremiumTitle).toBeInTheDocument();
    })
    
    test('Should render profit correctly', () => {
        const { getByTestId } = wrapper;
        const bePremiumProfit = getByTestId('bePremiumProfit');
        expect(bePremiumProfit).toHaveClass(classes.profit)
        expect(bePremiumProfit).toBeInTheDocument();
    })

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})
