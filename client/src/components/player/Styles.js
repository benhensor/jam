import styled from 'styled-components';

const PlayerContainer = styled.div`
	width: 100%;
	padding: 10px;
`

const ErrorMessage = styled.p`
	font-size: var(--font-size-xxs);
	color: red;
`

const SliderContainer = styled.div`
	width: 100%;
	height: 4px;
	border-radius: 2px;
	overflow: hidden;
	background-color: #ccc;
	position: relative;
	cursor: pointer;
`

const Slider = ({ progressBar }) => {
  return (
    <div
      style={{
        width: `${progressBar}%`,
        height: '100%',
        backgroundColor: 'var(--color-primary)',
        transition: 'width 0.01s linear',
        pointerEvents: 'none',
      }}
    />
  )
}

export { PlayerContainer, ErrorMessage, SliderContainer, Slider }