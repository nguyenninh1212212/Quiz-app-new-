import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Sample questions
const questions = [
  {
    id: 1,
    question: "An angle whose value is ___, is called a complete angle.",
    options: ["Maharashtra", "Odisha", "Assam", "Tamil Nadu"],
    correctAnswer: "Odisha",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris",
  },
];

const QuizScreen = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(120); // 2 phút (120 giây)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerSelect = (option) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = option;
    setSelectedAnswers(newSelectedAnswers);
  };

  const countCorrectAnswers = () => {
    return questions.filter(
      (q, index) => q.correctAnswer === selectedAnswers[index]
    ).length;
  };

  const handleSubmit = () => {
    const correctAnswers = countCorrectAnswers();
    const score = correctAnswers * 10;
    const totalQuestions = questions.length;

    navigation.navigate("result", {
      score: `${score}`,
      correctAnswers: `${correctAnswers}`,
      totalQuestions: `${totalQuestions}`,
    });
  };

  const handleNextQuestion = () => {
    if (!selectedAnswers[currentQuestion]) {
      Alert.alert("Warning", "Please select an answer before proceeding.");
    } else {
      handleNext();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1440" }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 24, flex: 1, justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity style={{ width: "30%" }} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", width: "30%", textAlign: "center" }}>
            Nộp bài
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              width: "27%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Nộp bài</Text>
          </TouchableOpacity>
        </View>

        {/* Thời gian đếm ngược */}
        <View
          style={{
            marginTop: 16,
            backgroundColor: "yellow",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Thời gian: {Math.floor(timeLeft / 60)}p {timeLeft % 60}s
          </Text>
        </View>

        {/* Câu hỏi */}
        <View style={{ backgroundColor: "#4F6D7A", padding: 16, borderRadius: 8, marginTop: 16 }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            {questions[currentQuestion].question}
          </Text>
        </View>

        {/* Đáp án */}
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              marginTop: 8,
              borderWidth: 2,
              backgroundColor:
                selectedAnswers[currentQuestion] === option
                  ? option === questions[currentQuestion].correctAnswer
                    ? "green"
                    : "red"
                  : "#2E3A59",
              borderColor:
                selectedAnswers[currentQuestion] === option
                  ? option === questions[currentQuestion].correctAnswer
                    ? "darkgreen"
                    : "darkred"
                  : "#1C2A3D",
            }}
            onPress={() => handleAnswerSelect(option)}
          >
            <Text style={{ color: "white", fontSize: 18 }}>{option}</Text>
          </TouchableOpacity>
        ))}

        {/* Nút điều hướng câu hỏi */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              width: "48%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handlePrev}
            disabled={currentQuestion === 0}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Prev Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "yellow",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              width: "48%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleNextQuestion}
            disabled={currentQuestion === questions.length - 1}
          >
            <Text style={{ color: "black", fontWeight: "600" }}>Next Question</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;
