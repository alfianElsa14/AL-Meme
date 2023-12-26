import { fireEvent, render } from '@testing-library/react';

import Card from '@components/Card';
import classes from '@components/Card/style.module.scss';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

const mockPropsMeme = [
    {
        id: 1,
        otherId: '181913649',
        title: 'Drake Hotline Bling',
        imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
        width: 1200,
        height: 1200,
        boxCount: 2,
        captions: 1177250,
        status: 'basic',
        createdAt: new Date(),
        updatedAt: new Date()
    },

    {
        id: 2,
        otherId: '284929871',
        title: 'They don`t know',
        imageUrl: 'https://i.imgflip.com/4pn1an.png',
        width: 671,
        height: 673,
        boxCount: 2,
        captions: 35250,
        status: 'premium',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

const mockPropsRole = {
    role: 'premium'
}

const memeId = 1
let wrapper;

beforeEach(() => {
    wrapper = render(<Card memes={mockPropsMeme} role={mockPropsRole} />);
})

describe('Component Card', () => {
    test('Should render container correctly', () => {
        const { getByTestId } = wrapper;
        const cardContainer = getByTestId('container');
        expect(cardContainer).toHaveClass(classes.container);
        expect(cardContainer).toBeInTheDocument();
    });

    test('Should render Card correctly', () => {
        const { getByTestId } = wrapper;
        const card = getByTestId('card');
        expect(card).toHaveClass(classes.card);
        expect(card).toBeInTheDocument();
    });

    test('Should render Card data correctly', () => {
        const { getByTestId } = wrapper;
        const cardData = getByTestId('cardData');
        expect(cardData).toHaveClass(classes.data);
        expect(cardData).toBeInTheDocument();
    });

    test('Should render Card title correctly', () => {
        const { getByTestId } = wrapper;
        const cardData = getByTestId('cardTitle');
        expect(cardData).toHaveClass(classes.title);
        expect(cardData).toBeInTheDocument();
    });

    test('Should call navigate when card clicked', () => {
        const { getByTestId } = wrapper;
        const card = getByTestId('navigate-memeDetail');
        fireEvent.click(card);
        expect(mockNavigate).toHaveBeenCalledWith(`/detail/${memeId}`);
    })

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})