package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Food struct {
	//struct มันคือ type ที่เก็บรวบรวม field ต่างๆ เพื่อที่จะจัดกลุ่ม data เข้าไว้ด้วยกัน
	//เช่น ใน food มีข้อมูลอะไรอยู่ข้างในบ้าง เป็นข้อมูลชนิดไหน
	// Id int '1' เป้นต้น

	Id       int    `json:"id"`
	FoodName string `json:"name"`
	Type     string `json:"type"`
	Img      string `json:"img"`
}

var foods []Food

// all food
func getFoods(w http.ResponseWriter, r *http.Request /*w http.ResponseWriter  คือการรับค่าresponse*/ /*  r *http.Request  คือการรับค่าresquest  ถ้าเป็นในภาษา js จะเขียนแบบ req,res*/) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(foods)
}

// By ID
func getFoodid(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range foods {
		if item.Id, _ = strconv.Atoi(params["id"]); item.Id == item.Id {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Food{})
}

// creat
func createFood(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var food Food

	_ = json.NewDecoder(r.Body).Decode(&food)

	foods = append(foods, food)

	json.NewEncoder(w).Encode(food)
}

func updateFood(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range foods {
		if item.Id, _ = strconv.Atoi(params["id"]); item.Id == item.Id {
			foods = append(foods[:index], foods[index+1:]...)
			var food Food
			_ = json.NewDecoder(r.Body).Decode(&food)
			food.Id = item.Id
			foods = append(foods, food)
			json.NewEncoder(w).Encode(food)
			return
		}
	}

}

func deleteFood(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range foods {
		if item.Id, _ = strconv.Atoi(params["id"]); item.Id == item.Id {
			foods = append(foods[:index], foods[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(foods)
}

func main() {
	r := mux.NewRouter()

	foods = append(foods, Food{Id: 1, FoodName: "P", Type: "Fried", Img: ""})
	foods = append(foods, Food{Id: 2, FoodName: "Donut", Type: "Fried", Img: ""})

	r.HandleFunc("/api/foods", getFoods).Methods("GET")
	r.HandleFunc("/api/foods/{id}", getFoodid).Methods("GET")
	r.HandleFunc("/api/foods", createFood).Methods("POST")
	r.HandleFunc("/api/foods/{id}", updateFood).Methods("PUT")
	r.HandleFunc("/api/foods/{id}", deleteFood).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", r))

}
