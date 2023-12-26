import Like from "@components/Like";
import classes from '@components/Like/style.module.scss';
import { render } from "@utils/testHelper";

const mockPropsLike = [
    {
        userId,
        memeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        User: {
            id: 1,
            username: 'mikail',
            email: 'mikail@gmail.com',
            imageUrl: 'image.jpg',
            role: 'basic',
            verified: true,
            verifyToken: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
]

let wrapper;
let userId = mockPropsLike[0].User.id
let memeId = 1

beforeEach(() => {
    wrapper = render(<Like likes={mockPropsLike} userId={userId} />)
})

describe("Like", () => {
    test('Should render correctly', () => {
        const { getByTestId } = wrapper;
        const commentComponent = getByTestId('Like');
        expect(commentComponent).toHaveClass(classes.like)
        expect(commentComponent).toBeInTheDocument();
    })
    
    test('Should render icon like correctly', () => {
        const { getByTestId } = wrapper;
        const commentComponent = getByTestId('iconLike');
        expect(commentComponent).toHaveClass(classes.iconLike)
        expect(commentComponent).toBeInTheDocument();
    })

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})