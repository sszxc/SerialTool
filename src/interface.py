import tkinter as tk
import tkinter.messagebox
import sys
from os import path
from PIL import Image, ImageTk

def getPath(filename):
    '''
    在debug/release两种模式下获取文件路径
    '''
    # 获取sys的'_MEIPASS'属性（打包模式），如果没有的话就返回绝对路径（调试模式）   

    if getattr(sys, 'frozen', False):
        bundle_dir = sys._MEIPASS
        filename = filename[3:] # 打包之后起点是在根目录
    else:
        bundle_dir = path.abspath(path.dirname(__file__))

    path_to_dat = path.join(bundle_dir, filename)

    return path_to_dat

class Window:
    def __init__(self, master=None):
        self.root = master
        self.root.iconbitmap(getPath('../img/logo.ico'))
        # 给窗口的可视化起名字
        self.root.title('SerialTool')
        # 设定窗口的大小(长 * 宽)
        self.root.geometry('1000x600')  # 这里的乘是小x
        self.root.resizable(width=False, height=False)

        # 两个主要 frame
        frame_send = tk.Frame(self.root, width=400, height=600, bg='blue')
        frame_send.place(x=0, y=0, anchor='nw')
        frame_receive = tk.Frame(self.root, width=600, height=600, bg='red')
        frame_receive.place(x=1000, y=0, anchor='ne')

        # place 放置方法
        tk.Label(frame_send, text='Config', font=('Arial', 20), ).place(in_=frame_send, relx=0, rely=0, anchor='nw')
        tk.Label(frame_send, text='Send', font=('Arial', 20), ).place(in_=frame_send, relx=0, rely=0.5, anchor='nw')
        tk.Label(frame_receive, text='Receive', font=('Arial', 20), ).place(in_=frame_receive, relx=0, rely=0, anchor='nw')
        tk.Label(frame_receive, text='Map', font=('Arial', 20), ).place(in_=frame_receive, relx=0, rely=0.5, anchor='nw')


# 图片
# photo = ImageTk.PhotoImage(Image.open(getPath('../img/02.jpg')))
