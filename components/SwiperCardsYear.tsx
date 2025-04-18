import { useRef } from 'react';
import styled from 'styled-components';
import { EffectCoverflow, Navigation, Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionTitle from 'components/SectionTitle';

// interface YearItem {
//   year: string;
// }

interface SwiperCardsYearProps {
  selectedYear: string | null;
  setSelectedYear: (year: string) => void;
}

const SwiperCardsYear: React.FC<SwiperCardsYearProps> = ({ selectedYear, setSelectedYear }) => {
  const currentYear = new Date().getFullYear();
  const years: string[] = Array.from({ length: currentYear - 2023 }, (_, i) => (2024 + i).toString());
  // const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleYearClick = (year: string, index: number) => {
    setSelectedYear(year); // Update state in ParentComponent
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index, 500);
    }
  };

  return (
    <Container>
      {/* <SectionTitleStyled>Explore By Year</SectionTitleStyled> */}
      <Collection>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          slidesPerView={2}
          spaceBetween={20}
          initialSlide={years.length - 1}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation, EffectCoverflow]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {years.map((year, index) => (
            <SwiperSlide key={index}>
              <Content onClick={() => handleYearClick(year, index)} selected={selectedYear === year}>
                <YearText>{year}</YearText>
              </Content>
            </SwiperSlide>
          ))}
        </Swiper>
      </Collection>
      {/* {selectedYear && <SelectedYearText>Selected Year: {selectedYear}</SelectedYearText>} */}
    </Container>
  );
};

export default SwiperCardsYear;

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');
  margin-top: -5%;
  margin-bottom: -3.5%;
`;

const SectionTitleStyled = styled(SectionTitle)`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: -3.5%;
`;

const Collection = styled.section`
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom:0;
  margin-top:0;
  .swiper {
    width: 90%;
  }

  .swiper-wrapper {
    display: flex;
  }
  @media (max-width: 1024px) {
  .swiper {
    width: 68%;
  }
  @media (max-width: 780px) {
  .swiper {
    width: 60%;
  }
   @media (max-width: 480px) {
  .swiper {
    width: 100%;
  }
  }

  margin-top: -3%;
  margin-bottom:-3%;
`;

const Content = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem; /* Adjust the height */
  width: 18rem; /* Adjust the width to make it rectangular */
  background-color: ${({ selected }) => (selected ? '#0099ff' : 'rgb(var(--secondBackground))')};
  border: 0.2rem solid rgba(255, 255, 255, 0.1);
  border-radius: 0.7rem;
  border-bottom: 0.4rem solid #0099ff;
  border-top: 0.4rem solid #0099ff;
  overflow: hidden;
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    height: 6rem; /* Adjust the height for smaller screens */
    width: 16rem; /* Adjust the width for smaller screens */
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 4rem;
    width: 6rem;
    font-size: 1.2rem;
  }
`;

const YearText = styled.div`
  color: rgb(var(--text));
  font-family: var(--font);
  transition: color 0.3s ease;
`;



