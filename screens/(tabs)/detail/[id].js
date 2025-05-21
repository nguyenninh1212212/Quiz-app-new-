import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getDetailExam } from "../../../api/exam";

const QuizScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, mode } = route.params; // mode = "practice" hoặc "exam"

  const {
    data: quest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exam", id],
    queryFn: () => getDetailExam(id),
    staleTime: Infinity,
  });

  const questions = quest?.data.quest || [];

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions.length * 60 || 600);
  const [submitted, setSubmitted] = useState(false);

  // Khi load câu hỏi, reset lại trạng thái
  useEffect(() => {
    if (mode === "practice") {
      // practice: selectedAnswers mỗi phần tử là mảng (có thể nhiều đáp án)
      setSelectedAnswers(Array(questions.length).fill([]));
    } else {
      // exam: selectedAnswers mỗi phần tử là null hoặc 1 string
      setSelectedAnswers(Array(questions.length).fill(null));
    }
    setTimeLeft(questions.length * 60 || 600);
    setCurrentQuestion(0);
    setSubmitted(false);
  }, [questions, mode]);

  // Timer
  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      setSubmitted(true);
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  // Xử lý chọn đáp án
  const handleAnswerSelect = (option) => {
    if (submitted) return; // Không chọn khi đã nộp

    if (mode === "practice") {
      // practice: chọn nhiều đáp án, không chọn lại đáp án đã chọn, ko cho thêm đáp án khi đủ số đáp án đúng
      setSelectedAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        const currentSelected = updatedAnswers[currentQuestion] || [];

        if (
          currentSelected.length >= questions[currentQuestion].correct.length
        ) {
          return prevAnswers;
        }

        if (currentSelected.includes(option)) {
          return prevAnswers;
        }

        updatedAnswers[currentQuestion] = [...currentSelected, option];
        return updatedAnswers;
      });

      // Tự động chuyển câu hỏi kế tiếp sau 1s
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      }, 1000);
    } else if (mode === "exam") {
      // exam: chỉ được chọn 1 đáp án, có thể thay đổi lựa chọn
      setSelectedAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestion] = option;
        return updatedAnswers;
      });
    }
  };

  // Đếm số câu đúng, dùng để tính điểm
  const countCorrectAnswers = () => {
    return questions.filter((q, index) => {
      if (mode === "practice") {
        const selected = selectedAnswers[index] || [];
        return (
          q.correct.every((answer) => selected.includes(answer)) &&
          selected.length === q.correct.length
        );
      } else {
        // exam: selectedAnswers[index] là 1 string (đáp án chọn)
        return selectedAnswers[index] === q.correct[0]; // giả sử chỉ 1 đáp án đúng
      }
    }).length;
  };

  // Submit bài
  const submitQuiz = () => {
    const correctAnswers = countCorrectAnswers();
    const totalQuestions = questions.length;
    const scorePerQuestion = 100 / totalQuestions;
    const score = Math.ceil(correctAnswers * scorePerQuestion);

    navigation.navigate("Kết quả", {
      score: `${score}`,
      correctAnswers: `${correctAnswers}`,
      totalQuestions: `${totalQuestions}`,
      id: id,
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);

    // Kiểm tra câu chưa trả lời
    const unansweredQuestions = selectedAnswers.filter(
      (answer) => !answer || (Array.isArray(answer) && answer.length === 0)
    );

    if (unansweredQuestions.length > 0) {
      Alert.alert(
        "Chưa trả lời hết câu hỏi",
        "Bạn có chắc muốn nộp bài không?",
        [
          {
            text: "Hủy",
            style: "cancel",
            onPress: () => setSubmitted(false),
          },
          { text: "Nộp bài", onPress: () => submitQuiz() },
        ]
      );
    } else {
      submitQuiz();
    }
  };

  const renderQuestionNavigator = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
      >
        {questions.map((_, index) => {
          const isAnswered =
            mode === "practice"
              ? selectedAnswers[index]?.length > 0
              : selectedAnswers[index] !== null;
          const isCurrent = currentQuestion === index;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentQuestion(index)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: isCurrent
                  ? "#ff1cb3"
                  : isAnswered
                  ? "#f7b61f"
                  : "#555",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 4,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#002060",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#002060",
          padding: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
          Đã xảy ra lỗi khi tải dữ liệu.
        </Text>
      </SafeAreaView>
    );
  }

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2a3164" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#ff1cb3",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Thời gian: {Math.floor(timeLeft / 60)}:{timeLeft % 60}s
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
          flexGrow: 1,
        }}
      >
        {renderQuestionNavigator()}

        {questions.length > 0 && questions[currentQuestion] && (
          <>
            <View
              style={{
                padding: 16,
                borderRadius: 8,
                marginTop: 16,
                flex: 1,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Câu {currentQuestion + 1}/{questions.length}:{" "}
                {questions[currentQuestion].question}
              </Text>
            </View>

            {questions[currentQuestion].answer.map((option, index) => {
              let isSelected;
              if (mode === "practice") {
                isSelected = selectedAnswers[currentQuestion]?.includes(option);
              } else {
                isSelected = selectedAnswers[currentQuestion] === option;
              }

              const isCorrect =
                questions[currentQuestion].correct.includes(option);

              let backgroundColor = "white";
              let textColor = "black";

              if (mode === "practice") {
                if (isSelected) {
                  console.log(
                    "🚀 ~ {questions[currentQuestion].answer.map ~ isCorrect:",
                    isCorrect
                  );

                  backgroundColor = isCorrect ? "#00ff3b" : "red";
                  textColor = "white";
                }
              } else if (mode === "exam") {
                if (submitted) {
                  if (isSelected) {
                    backgroundColor = isCorrect ? "#00ff3b" : "red";
                    textColor = "white";
                  } else if (isCorrect) {
                    backgroundColor = "#00ff3b";
                    textColor = "white";
                  }
                } else {
                  // CHỖ CẦN THÊM ĐỂ KHI CHƯA NỘP, đáp án chọn sẽ có màu riêng
                  if (isSelected) {
                    backgroundColor = "#f7b61f"; // light blue
                    textColor = "white";
                  }
                }
              }
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginTop: 12,
                    paddingVertical: 30,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    backgroundColor,
                  }}
                  onPress={() => handleAnswerSelect(option)}
                  disabled={
                    submitted ||
                    (mode === "practice" &&
                      selectedAnswers[currentQuestion]?.length >=
                        questions[currentQuestion].correct.length)
                  }
                >
                  <Text style={{ color: textColor, fontSize: 18 }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          <TouchableOpacity
            style={{
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
            <Text style={{ color: "white", fontWeight: "600" }}>Câu trước</Text>
          </TouchableOpacity>

          {currentQuestion === questions.length - 1 ? (
            <TouchableOpacity
              style={{
                backgroundColor: "cyan",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                width: "48%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>Nộp bài</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                paddingHorizontal: 16,
                paddingVertical: 20,
                borderRadius: 8,
                width: "48%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleNext}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Câu tiếp theo
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizScreen;
