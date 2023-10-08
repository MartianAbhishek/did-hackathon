import styled from "styled-components";
import FlexContainer from "src/components/FlexContainer";
import Typography from "../Typography";
import { useNavigate } from "react-router-dom";

interface FilterOptionsType {
  key: string;
  title: string;
  query: string;
  pathname: string;
}

interface IPropType {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  filterOptions: Array<FilterOptionsType>;
  username: string | null;
}

const Container = styled(FlexContainer)`
  max-width: 500px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const Option = styled(FlexContainer)<{ isSelected: boolean }>`
  width: 100%;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.black[900] : theme.colors.black[200]};
  padding: 10px 0;
  cursor: pointer;

  transition: all 0.3s ease-out;
`;

const NavBar = (props: IPropType) => {
  const navigate = useNavigate();
  const { selectedOption, setSelectedOption, filterOptions, username } = props;

  return (
    <>
      <Container>
        {filterOptions.map((option: FilterOptionsType) => (
          <Option
            key={option.key}
            isSelected={selectedOption === option.key}
            onClick={() => {
              setSelectedOption(option.key);
              navigate({
                pathname: option.pathname,
                search: option.query,
              });
            }}
          >
            <Typography
              variant="ts14r"
              colorCode={["black", selectedOption === option.key ? 100 : 900]}
            >
              {option.title}
            </Typography>
          </Option>
        ))}
      </Container>
      {/* <div>
        <Typography variant="ts14r">{username}</Typography>
      </div> */}
    </>
  );
};

export default NavBar;
