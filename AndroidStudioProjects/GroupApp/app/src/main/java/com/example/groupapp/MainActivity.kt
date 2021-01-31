package com.example.groupapp

import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    lateinit var edtName : EditText
    lateinit var edtNumber : EditText
    lateinit var edtNameResult : EditText
    lateinit var edtNumberResult : EditText
    lateinit var btnInit:Button
    lateinit var btnInsert:Button
    lateinit var btnSelect:Button
    lateinit var btnUpdate:Button
    lateinit var btnDelete:Button

    lateinit var myHelper:myDBHelper
    lateinit var sqlDB : SQLiteDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //연결해주기
        edtName = findViewById(R.id.editName)
        edtNumber = findViewById(R.id.editNumber)
        edtNameResult = findViewById(R.id.edtNameResult)
        edtNumberResult = findViewById(R.id.edtNumberResult)

        btnInit = findViewById(R.id.btnInit)
        btnInsert = findViewById(R.id.btnInsert)
        btnSelect = findViewById(R.id.btnSelect)
        btnUpdate = findViewById(R.id.btnUpdate)
        btnDelete = findViewById(R.id.btnDelete)

        //버튼 세개에 대한 리스너
        //객체 받아오기 - DB
        myHelper = myDBHelper(this)

        btnInit.setOnClickListener {
            //get, set 생략 가능
            sqlDB = myHelper.writableDatabase
            //sql버전에 대한 설정
            myHelper.onUpgrade(sqlDB, 1,2)
            sqlDB.close()

            btnSelect.callOnClick()
        }

        btnInsert.setOnClickListener {
            sqlDB = myHelper.writableDatabase
            //sql문 입력
            sqlDB.execSQL("INSERT INTO groupTBL VALUES ('"+edtName.text.toString()+"',"
                +edtNumber.text.toString() +");")
            sqlDB.close()

            Toast.makeText(applicationContext, "입력됨", Toast.LENGTH_SHORT).show()
            
            //버튼 누른 후 바로 결과 보이기
            btnSelect.callOnClick()
        }

        //수정을 눌렀을 때 - 이름에 수정하고 싶은 그룹 이름 넣고 인원에 수정할 인원 넣어주기
        btnUpdate.setOnClickListener {
            sqlDB = myHelper.writableDatabase

            sqlDB.execSQL("UPDATE groupTBL SET gNumber = " + edtNumber.text +
                    " WHERE gName = '" + edtName.text.toString() + "';")
            sqlDB.close()

            Toast.makeText(applicationContext, "수정됨", Toast.LENGTH_SHORT).show()
            btnSelect.callOnClick()
        }

        btnDelete.setOnClickListener {
            sqlDB = myHelper.writableDatabase
            sqlDB.execSQL("DELETE FROM groupTBL WHERE gName = '"+ edtName.text.toString()+"';")
            sqlDB.close()

            Toast.makeText(applicationContext, "삭제됨", Toast.LENGTH_SHORT).show()
            btnSelect.callOnClick()
        }

        //조회를 눌렀을 때
        btnSelect.setOnClickListener { 
            //조회는 데이터를 읽어오는 것이기 때문에
            sqlDB = myHelper.readableDatabase

            var cursor:Cursor
            cursor = sqlDB.rawQuery("SELECT * FROM groupTBL;", null)

            //저장할 배열 설정
            var strNames = "그룹 이름" + "\r\n" + "---------" + "\r\n"
            var strNumbers = "인원"+ "\r\n" + "---------" + "\r\n"


            while(cursor.moveToNext()){
                //0번째 행에 있는 것은 이름
                strNames +=cursor.getString(0) + "\r\n"
                //1번째 행에 있는 것은 번호
                strNumbers +=cursor.getString(1) + "\r\n"
            }

            //조회해서 받아온 데이터들을 resultName, resultNumber 안에 입력
            edtNameResult.setText(strNames)
            edtNumberResult.setText(strNumbers)

            cursor.close()
            sqlDB.close()

            Toast.makeText(applicationContext, "조회됨", Toast.LENGTH_SHORT).show()
        }
    }

    inner class myDBHelper(context: Context):SQLiteOpenHelper(context, "groupDB", null, 1){
        override fun onCreate(db: SQLiteDatabase?) {
            //Name을 primary Key로 설정 - 찾아낼때 쓰이는 key
            db!!.execSQL("CREATE TABLE groupTBL (gName CHAR(20) PRIMARY KEY, gNumber Integer);")
        }

        override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
            //DB 삭제 후 다시 생성
            db!!.execSQL("DROP TABLE IF EXISTS groupTBL")
            onCreate(db)
        }

    }
}