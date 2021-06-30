import psycopg2
from dotenv import load_dotenv
import os
import glob

load_dotenv()

print("Checking uploads.....")


try:
    conn = psycopg2.connect( database= os.getenv("DB_NAME"), user=os.getenv("DB_USERNAME"), password=os.getenv("DB_PASSWORD"), host=os.getenv("DB_HOST"))
    curr = conn.cursor()

    statements, inputs, outputs, blogs = [], [], [], []

    prefixstatement = "./data/questions/statement/"   # 27:
    prefixinput     = "./data/questions/input/"       # 23:
    prefixoutput    = "./data/questions/output/"      # 24:
    prefixblog      = "./data/blogs/"                 # 13:  

    ### Add all filenames present in memory to variables
    statements = glob.glob(prefixstatement+"*.txt")
    inputs = glob.glob(prefixinput+"*.txt")
    outputs = glob.glob(prefixoutput+"*.txt")
    blogs = glob.glob(prefixblog+"*.txt")




    ######################## QUESTIONS ##################################

    ### Pop filenames if all 3 files are present
    curr.execute("SELECT * FROM QUESTIONS")
    rows = curr.fetchall()
    for data in rows:
        fcount=0
        tempstore = []
        for i in statements:
            if(i[27:] == data[3]):
                tempstore.append(i)
                fcount += 1
                statements.remove(i)
                break
        for i in inputs:
            if(i[23:] == data[4]):
                tempstore.append(i)
                fcount += 1
                inputs.remove(i)
                break
        for i in outputs:
            if(i[24:] == data[5]):
                tempstore.append(i)
                fcount += 1
                outputs.remove(i)
                break  

        ### Handles broken questions (missing files)
        if not (fcount ==3):
            for i in tempstore:
                os.remove(i)
            print(data[0], data)    
            curr.execute("DELETE FROM SOLVED WHERE QUESTIONID = %s",(data[0],))
            curr.execute("DELETE FROM QUESTIONS WHERE ID = %s",(data[0],))
            conn.commit()
  
    ### Removing dangling files (deleted from database)
    for i in statements:
        os.remove(i)
    for i in inputs:
        os.remove(i)
    for i in outputs:
        os.remove(i)        


    ########################## BLOGS #####################################
        
    curr.execute("SELECT * FROM BLOGS")
    rows = curr.fetchall()
    for data in rows:
        pos = 0
        for i in blogs:
            if(i[13:] == data[2]):
                pos = 1
                blogs.remove(i)
                break  
        if(pos==0):
            curr.execute("DELETE FROM COMMENTS WHERE BLOGID = %s",(data[0],))
            curr.execute("DELETE FROM BLOGLIKES WHERE BLOGID = %s",(data[0],))
            curr.execute("DELETE FROM BLOGS WHERE ID = %s",(data[0],))
            conn.commit()

    for i in blogs:
        os.remove(i)            


except:
    print("Connection failed mysteriously ")


print("Done")