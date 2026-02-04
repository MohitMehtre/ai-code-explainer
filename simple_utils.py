# simple_utils.py - A tiny utility library

def reverse_string(text):
    """
    Return the input string with characters in reverse order.
    
    Parameters:
        text (str): The string to reverse.
    
    Returns:
        str: The reversed string.
    """
    return text[::-1]

def count_words(sentence):
    """
    Count the number of words in a sentence.
    
    Parameters:
    	sentence (str): Input string whose words will be counted.
    
    Returns:
    	count (int): Number of whitespace-delimited tokens produced by `sentence.split()`.
    """
    return len(sentence.split())

def celsius_to_fahrenheit(celsius):
    """
    Convert a temperature from degrees Celsius to degrees Fahrenheit.
    
    Parameters:
        celsius (float or int): Temperature in degrees Celsius.
    
    Returns:
        float: Temperature in degrees Fahrenheit.
    """
    return (celsius * 9/5) + 32