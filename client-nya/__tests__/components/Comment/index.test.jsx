import Comment from "@components/Comment";
import classes from '@components/Comment/style.module.scss';
import { render } from "@utils/testHelper";

const mockPropsComment = [
    {
        userId,
        memeId,
        comment: 'testt 1123',
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
let userId = mockPropsComment[0].User.id
let memeId = 1

beforeEach(() => {
    wrapper = render(<Comment comments={mockPropsComment} userId={userId} />)
})

describe('Comment', () => {
    test('Should render Comment correctly', () => {
        const { getByTestId } = wrapper;
        const commentComponent = getByTestId('comment');
        expect(commentComponent).toHaveClass(classes.comment)
        expect(commentComponent).toBeInTheDocument();
    })

    test('Should render Comment list correctly', () => {
        const { getByTestId } = wrapper;
        const commentComponent = getByTestId('commentList');
        expect(commentComponent).toHaveClass(classes.commentList)
        expect(commentComponent).toBeInTheDocument();
    })

    test('Should render picture correctly', () => {
        const { getByTestId } = wrapper;
        const pictureComponent = getByTestId('picture');
        expect(pictureComponent).toHaveClass(classes.picture)
        expect(pictureComponent).toBeInTheDocument();
    })

    test('Should render user comment correctly', () => {
        const { getByTestId } = wrapper;
        const userComment = getByTestId('userComment');
        expect(userComment).toBeInTheDocument();
    });

    test('Should render username correctly', () => {
        const { getByTestId } = wrapper;
        const username = getByTestId('username');
        expect(username).toBeInTheDocument();
    });

    test('Should render comment text correctly', () => {
        const { getByTestId } = wrapper;
        const commentText = getByTestId('commentText');
        expect(commentText).toHaveTextContent('testt 1123');
    });

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})