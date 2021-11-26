import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import {
  useState,
  useCallback,  
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";



interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: "red.500",
  default: "gray.200",
  focus: "gray.0",
  filled: "green.500",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, icon: Icon, error = null, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [variation, setVariation] = useState("default");
  // const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation("focus");
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel color="gray.400">{label}</FormLabel>}

      <InputGroup flexDirection="column">
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} >
            <Icon />
          </InputLeftElement>
        )}
        <ChakraInput
          id={name}
          name={name}
          onFocus={handleInputFocus}
          onBlurCapture={handleInputBlur}
          errorBorderColor="red.300"
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          borderColor={inputVariation[variation]}
          color='#333333'
          variant="outline"
          _hover={{ bgColor: "gray.100" }}
          _placeholder={{ color: "gray.300" }}
          _focus={{
            bg: "gray.100",
          }}
          size="lg"
          h="50px"
          ref={ref}
          {...rest}
        />
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}

      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);