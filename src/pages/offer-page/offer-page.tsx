import { useParams, Link } from 'react-router-dom';
import { Offer } from '../../shared/entities/offer/types';
import { Review } from '../../mocks';
import ReviewForm from '../../components/review-form/review-form';

interface OfferPageProps {
  offers: Offer[];
  reviews: Review[];
}

function OfferPage({ offers, reviews }: OfferPageProps) {
  const { id } = useParams<{ id: string }>();
  const offer = offers.find((o) => o.id === id);

  if (!offer) {
    return (
      <div className="page">
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <h1>Offer not found</h1>
          <Link to="/">Back to main</Link>
        </div>
      </div>
    );
  }

  // Простая версия - только динамические данные + ReviewForm
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">
                      {offers.filter((o) => o.isFavorite).length}
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <h1>{offer.title}</h1>
            <p>Price: €{offer.price} per night</p>
            <p>Rating: {offer.rating}</p>
            <p>Type: {offer.type}</p>
            {offer.isPremium && <span>Premium</span>}
            <img src={offer.previewImage} alt={offer.title} width="600" />
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {/* Блок отзывов */}
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                </h2>

                <ul className="reviews__list">
                  {reviews.map((review) => (
                    <li key={review.id} className="reviews__item">
                      <div className="reviews__user user">
                        <div className={`reviews__avatar-wrapper ${review.user.isPro ? 'reviews__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                          <img
                            className="reviews__avatar user__avatar"
                            src={review.user.avatarUrl}
                            width="54"
                            height="54"
                            alt="Reviews avatar"
                          />
                        </div>
                        <span className="reviews__user-name">{review.user.name}</span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{ width: `${review.rating * 20}%` }}></span>
                          </div>
                        </div>
                        <p className="reviews__text">{review.comment}</p>
                        <time className="reviews__time" dateTime={review.date}>
                          {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Форма отправки комментария */}
                <ReviewForm />
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OfferPage;
